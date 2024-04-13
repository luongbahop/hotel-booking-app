import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export const buildFindAllConditions = (query, options, defaultValues) => {

  let start_date = query.start_date || '';
  let end_date = query.end_date || '';
  let filter_date_by = query.filter_date_by || 'created_at';

  let orderBy = query.orderBy || defaultValues.orderBy;
  let order = query.order || defaultValues.order;

  const w = () => {
    let conditions = { [Op.and]: [{ ...options.where }] };

    // filter by date
    if (start_date && end_date) {
      conditions[Op.and].push({
        [filter_date_by]: { [Op.between]: [start_date, end_date] },
      });
    } else if (start_date) {
      conditions[Op.and].push({
        [filter_date_by]: { [Op.gte]: start_date },
      });
    } else if (end_date) {
      conditions[Op.and].push({
        [filter_date_by]: { [Op.lte]: end_date },
      });
    }

    for (let index = 1; index <= 100; index++) {
      let filter_key_n = query[`filter_key_${index}`];
      let filter_value_n = query[`filter_value_${index}`];

      let isArrayOfValues = filter_value_n?.includes('_');
      let defaulFilterOperator = isArrayOfValues ? 'in' : 'like';
      let filter_operator_n = query[`filter_operator_${index}`] || defaulFilterOperator;

      filter_value_n = isArrayOfValues ? filter_value_n?.split('_') : filter_value_n;
      if (filter_operator_n === 'like') {
        filter_value_n = `%${filter_value_n}%`;
      }
      if (filter_key_n && filter_value_n) {
        conditions[Op.and].push({
          [filter_key_n]: { [Op[`${filter_operator_n}`]]: filter_value_n },
        });
      }
    }
    return conditions;
  };

  const where = {
    order: [[orderBy, order]],
    ...(query.limit ? { limit: Number(query.limit) } : { limit: 10 }),
    ...(query.offset && { offset: Number(query.offset) }),
    ...options,
    where: w(),
  };
  return where;
};

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
    let filter_key = query.filter_key;
    let filter_value = query.filter_value;
    if (filter_key && filter_value) {
      conditions[Op.and].push({
        [filter_key]: { [Op.like]: `%${filter_value}%` },
      });
    }

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
      if (filter_key_n && filter_value_n) {
        conditions[Op.and].push({
          [filter_key_n]: { [Op.like]: `%${filter_value_n}%` },
        });
      }
    }
    return conditions;
  };

  const where = {
    order: [[orderBy, order]],
    ...options,
    where: w(),
  };
  return where;
};

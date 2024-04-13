import { Sequelize } from 'sequelize';
import models from '../models.js';
import { TABLES } from '../../configs/database.js';
import { buildFindAllConditions } from '../../helpers/common.helper.js';

const Op = Sequelize.Op;
const { Customer, Booking } = models;

// get all customers
export const getCustomers = async (req, res) => {
  const start = new Date().getTime();
  try {
    let keyword = req.query.keyword || '';
    let attributes = req.query.attributes || TABLES.tbl_customers.default_attributes;

    const data = await Customer.findAll(
      buildFindAllConditions(
        req.query,
        {
          attributes,
          where: {
            [Op.or]: [{ fullname: { [Op.like]: `%${keyword}%` } }, { email: { [Op.like]: `%${keyword}%` } }, { address: { [Op.like]: `%${keyword}%` } }],
          },
        },
        { orderBy: 'customer_id', order: 'DESC' }
      )
    );

    return res.status(200).send({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// get customer by id
export const getCustomerById = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Customer.findOne({
      where: {
        customer_id: id,
      },
      include: [
        { model: Booking, as: 'bookings' },
      ],
    });
    if (!data) {
      return res.status(500).send({
        error: `Customer ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    return res.status(200).send({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// create a new customer
export const createCustomer = async (req, res) => {
  const start = new Date().getTime();
  try {
    const { fullname, email, phone } = req.body;
    if (!fullname) {
      return res.status(500).json({
        success: false,
        error: 'Fullname is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (!email) {
      return res.status(500).json({
        success: false,
        error: 'E-mail is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }

    if (!phone) {
      return res.status(500).json({
        success: false,
        error: 'Phone is a required field.',
        exe_time: new Date().getTime() - start,
      });
    }
    const data = await Customer.create(req.body);

    return res.status(201).json({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('Internal server error:', error.message);
    return res.status(500).json({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// update customer by id
export const updateCustomer = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Customer.findOne({
      where: {
        customer_id: id,
      },
    });

    if (data) {
      await Customer.update(
        req.body,
        {
          where: {
            customer_id: id,
          },
          individualHooks: true,
        }
      );
      const updatedData = await Customer.findOne({
        where: {
          customer_id: id,
        },
      });
      return res.status(201).send({
        data: updatedData,
        success: true,
        exe_time: new Date().getTime() - start,
      });
    }
    return res.status(500).send({
      error: `Customer ID = ${id} is not found.`,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// delete customer by id
export const deleteCustomer = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await Customer.findOne({
      where: {
        customer_id: id,
      },
    });
    if (!data) {
      return res.status(500).send({
        error: `Customer ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    await Customer.destroy({
      where: {
        customer_id: id,
      },
    });
    return res.status(200).send({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

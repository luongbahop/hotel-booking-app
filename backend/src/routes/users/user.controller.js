import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import models from '../models.js';
import { TABLES } from '../../configs/database.js';
import { buildFindAllConditions } from '../../helpers/common.helper.js';

const Op = Sequelize.Op;
const {
  User,
} = models;
dotenv.config();

// login
export const login = async (req, res) => {
  const start = new Date().getTime();
  try {
    const username = req.body?.username;
    const password = req.body?.password;
    if (!username) {
      return res.status(500).json({
        success: false,
        error: 'Username is required.',
        exe_time: new Date().getTime() - start,
      });
    }
    if (!password) {
      return res.status(500).json({
        success: false,
        error: 'Password is required.',
        exe_time: new Date().getTime() - start,
      });
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });
    if (!user) {
      return res.status(500).json({
        success: false,
        error: 'Username is not found.',
        exe_time: new Date().getTime() - start,
      });
    }
    const isValidPassword = user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(500).json({
        exe_time: new Date().getTime() - start,
        success: false,
        error: 'Password is not correct.',
      });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.update({ ...user, token: accessToken });

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: user,
      accessToken,
      refreshToken,
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

// logout
export const logout = async (req, res) => {
  const start = new Date().getTime();
  try {
    const body = req.body;
    const username = req.userInfo?.username;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(500).json({
        success: false,
        error: 'User is not found.',
        exe_time: new Date().getTime() - start,
      });
    }
    await user.update({ ...user, token: '' });
    user.destroyToken(body?.accessToken);
    user.destroyToken(body?.refreshToken);

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
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

// refresh token
export const refreshToken = async (req, res) => {
  const start = new Date().getTime();
  try {
    const refreshToken = req.body?.refreshToken;
    jwt.verify(refreshToken, process.env.AUTH_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        console.log('Verify refresh token error', err.message);
        return res.status(500).send({
          error: `Verify refresh token error: ${err?.message}.`,
          success: false,
          exe_time: new Date().getTime() - start,
        });
      }
      const user = await User.findOne({
        where: { username: decoded.username },
      });
      if (!user) {
        return res.status(500).json({
          success: false,
          error: 'User is not found.',
          exe_time: new Date().getTime() - start,
        });
      }
      const accessToken = user.generateAccessToken();
      await user.update({ ...user, token: accessToken });
      return res.status(200).json({
        success: true,
        message: 'Refresh access token successfully',
        accessToken,
        exe_time: new Date().getTime() - start,
      });
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

// register
export const register = async (req, res) => {
  const start = new Date().getTime();
  try {
    const { body } = req;
    const data = await User.findOne({
      where: {
        [Op.or]: [{ username: body?.username }, { email: body?.username }],
      },
    });
    if (data) {
      return res.status(500).send({
        error: `Username or email ${body?.username} was registered.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }

    const user = await User.create(body);
    return res.status(200).send({
      data: user,
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

// forgot password
export const forgotPassword = async (req, res) => {
  const start = new Date().getTime();
  try {
    const { body } = req;
    // todo: send email to user link to reset password
    const data = await User.findOne({
      where: {
        email: body?.email,
      },
    });

    return res.status(200).json({
      data,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.error('email sent error', error.message);
    return res.status(500).json({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// change password
export const changePassword = async (req, res) => {
  const start = new Date().getTime();
  try {
    const { email, password, repassword } = req.body;

    if (!email) {
      return res.status(500).json({
        success: false,
        message: 'E-mail is required.',
        exe_time: new Date().getTime() - start,
      });
    }
    if (!password) {
      return res.status(500).json({
        success: false,
        message: 'Password is required.',
        exe_time: new Date().getTime() - start,
      });
    }
    if (!repassword) {
      return res.status(500).json({
        success: false,
        message: 'Re-password is required.',
        exe_time: new Date().getTime() - start,
      });
    }
    if (password !== repassword) {
      return res.status(500).json({
        success: false,
        message: 'Password is not matched Re-password.',
        exe_time: new Date().getTime() - start,
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'User not found.',
        exe_time: new Date().getTime() - start,
      });
    }

    const hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.update(
      { ...user, password: hashed_password },
      {
        where: {
          user_id: user.user_id,
        },
        individualHooks: true,
      }
    );

    // Send success email notification
    const successEmailHtml = `
      <p>Xin chào ${user.fullname || user.email},</p>
      <p>Mật khẩu của bạn đã được thay đổi thành công.</p>
      <p>Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
      <p>Chúc bạn có một ngày tốt lành.</p>
    `;

    const successEmailResult = await sendMailAzure({
      to: user.email,
      subject: 'Thông báo thay đổi mật khẩu',
      html: defaultEmailTemplate('Thông báo thay đổi mật khẩu', successEmailHtml),
    });

    console.log('Success Email result:', successEmailResult);

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.error('Change password error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
      exe_time: new Date().getTime() - start,
    });
  }
};

// get all users
export const getUsers = async (req, res) => {
  const start = new Date().getTime();
  try {
    let keyword = req.query.keyword || '';
    let attributes = req.query.attributes || TABLES.tbl_users.default_attributes;
    const data = await User.findAll(
      buildFindAllConditions(
        req.query,
        {
          attributes,
          where: {
            [Op.or]: [{ email: { [Op.like]: `%${keyword}%` } }, { username: { [Op.like]: `%${keyword}%` } }, { fullname: { [Op.like]: `%${keyword}%` } }],
          },
          include: [
            { model: User, as: 'author', attributes: TABLES.tbl_users.default_attributes },
            { model: User, as: 'editor', attributes: TABLES.tbl_users.default_attributes },
          ],
        },
        { orderBy: 'user_id', order: 'DESC' }
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

// get user by id
export const getUserById = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await User.findOne({
      where: {
        user_id: id,
      },
      include: [
        { model: User, as: 'author', attributes: TABLES.tbl_users.default_attributes },
        { model: User, as: 'editor', attributes: TABLES.tbl_users.default_attributes },
      ],
    });
    if (!data) {
      return res.status(500).send({
        error: `User ID = ${id} is not found.`,
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

// create a new user
export const createUser = async (req, res) => {
  const start = new Date().getTime();
  try {
    const data = await User.create({ ...req.body, created_by: req?.userInfo?.user_id });
    const userId = data.dataValues.user_id;
    const dataUser = await User.findOne({
      where: {
        user_id: userId,
      },
      include: [
        { model: User, as: 'author', attributes: TABLES.tbl_users.default_attributes },
        { model: User, as: 'editor', attributes: TABLES.tbl_users.default_attributes },
      ],
    });
    return res.status(201).send({
      data: dataUser,
      success: true,
      exe_time: new Date().getTime() - start,
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      message: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

// update user by id
export const updateUser = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await User.findOne({
      where: {
        user_id: id,
      },
    });

    if (!data) {
      return res.status(500).send({
        error: `User ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }
    let body = req.body;
    // not able to change email, username
    body.username = data.username;
    body.email = data.email;

    // change password
    body.password = data.password;
    if (body.new_password) {
      body.password = data.hashPassword(body.new_password);
    }

    await User.update(
      { ...req.body, updated_by: req?.userInfo?.user_id },
      {
        where: {
          user_id: id,
        },
      }
    );

    const updatedData = await User.findOne({
      where: {
        user_id: id,
      },
      include: [
        { model: User, as: 'author', attributes: TABLES.tbl_users.default_attributes },
        { model: User, as: 'editor', attributes: TABLES.tbl_users.default_attributes },
      ],
    });
    return res.status(201).send({
      data: updatedData,
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

// delete user by id
export const deleteUser = async (req, res) => {
  const start = new Date().getTime();
  try {
    const {
      params: { id },
    } = req;
    const data = await User.findOne({
      where: {
        user_id: id,
      },
    });
    if (!data) {
      return res.status(500).send({
        error: `User ID = ${id} is not found.`,
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }

    await User.destroy({
      where: {
        user_id: id,
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

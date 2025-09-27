import { loginOrSignupWithGoogle, registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';
import { logoutUser } from '../services/auth.js';
import { refreshUsersSession } from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOauth2.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User has been created successfully!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    secure: true,
    sameSite: 'none',
    path: '/',
  });

  res.json({
    status: 200,
    message: 'User successfully logged in!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    secure: true,
    sameSite: 'none',
    path: '/',
  });
};

export const refreshUsersSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session refreshed successfully!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

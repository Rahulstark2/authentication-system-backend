import { Router } from 'express';
import { signup, login, getMe, requestPasswordReset, resetPassword } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';
import validate from '../middleware/validationMiddleware';
import { signupSchema, loginSchema, passwordResetRequestSchema, passwordResetSchema } from '../utils/validationSchemas';
import { requireRole } from '../middleware/roleMiddleware';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/signup', authLimiter, validate(signupSchema), signup);
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', authMiddleware, getMe);

router.post('/request-password-reset', authLimiter, validate(passwordResetRequestSchema), requestPasswordReset);
router.post('/reset-password', authLimiter, validate(passwordResetSchema), resetPassword);

router.get('/fetch-all-users', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

export default router;
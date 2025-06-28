import rateLimit from 'express-rate-limit';


export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});


export const authLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 5, 
  message: {
    message: 'Too many attempts, please try again after 2 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

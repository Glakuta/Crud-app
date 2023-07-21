declare namespace Express {
    export interface Request {
      identity?: Record<string, any>;
    }
  }
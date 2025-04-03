import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: this.getCustomMessage(exception),
      });
    }
  
    private getCustomMessage(exception: HttpException): string {
      const response = exception.getResponse();
      
      if (typeof response === 'object') {
        return (response as any).message || exception.message;
      }
      
      return exception.message;
    }
  }
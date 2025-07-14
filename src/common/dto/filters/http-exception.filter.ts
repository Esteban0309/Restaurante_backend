import {
    ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { ErrorResponseDto } from '../response.dto';
  
  @Catch()
  export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const exceptionResponse = exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
  
      const message = typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message;
  
      const errorResponse = new ErrorResponseDto(message, status);
      response.status(status).json(errorResponse);
    }
  }
  export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Log completo del error
    console.error('Exception thrown:', exception);

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
      message,
    });
  }
}
  
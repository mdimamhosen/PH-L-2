import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { CustomerService } from './customers.service';

const createCustomer = catchAsyncResponse(async (req, res) => {
  const result = await CustomerService.createCustomer(req.body);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to create customer',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const getAllCustomers = catchAsyncResponse(async (req, res) => {
  const result = await CustomerService.getAllCustomers();
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get customers',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customers retrieved successfully',
    data: result,
  });
});

const getCustomerById = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.getCustomerById(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to get customer',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer retrieved successfully',
    data: result,
  });
});

const updateCustomer = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.updateCustomer(id, req.body);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to update customer',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

const deleteCustomer = catchAsyncResponse(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.deleteCustomer(id);
  if (!result) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Failed to delete customer',
    });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer deleted successfully',
    data: result,
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

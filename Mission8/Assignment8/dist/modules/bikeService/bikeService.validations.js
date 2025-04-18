"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeServiceValidations = void 0;
const zod_1 = require("zod");
var Status;
(function (Status) {
    Status["pending"] = "pending";
    Status["in_progress"] = "in_progress";
    Status["done"] = "done";
})(Status || (Status = {}));
const addServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string().min(1, { message: 'Bike ID is required' }),
        serviceDate: zod_1.z.string().optional(),
        description: zod_1.z.string(),
        status: zod_1.z
            .enum([Status.pending, Status.in_progress, Status.done])
            .optional(),
    }),
});
const updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        completionDate: zod_1.z.string().optional(),
    }),
});
exports.bikeServiceValidations = {
    addServiceValidationSchema: addServiceValidationSchema,
    updateServiceValidationSchema: updateServiceValidationSchema,
};

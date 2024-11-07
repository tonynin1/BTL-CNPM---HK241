"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module1ExampleModule = void 0;
const common_1 = require("@nestjs/common");
const module1_example_controller_1 = require("./module1_example.controller");
const module1_example_service_1 = require("./module1_example.service");
let Module1ExampleModule = class Module1ExampleModule {
};
exports.Module1ExampleModule = Module1ExampleModule;
exports.Module1ExampleModule = Module1ExampleModule = __decorate([
    (0, common_1.Module)({
        controllers: [module1_example_controller_1.Module1ExampleController],
        providers: [module1_example_service_1.Module1ExampleService]
    })
], Module1ExampleModule);
//# sourceMappingURL=module1_example.module.js.map
import { Controller } from "../../../../controller.js";
import Car from '../../../../../models/car-model.js'
import Pagination from "../../../../../helpers/pagination.js" 
import {response}  from '../../../../../helpers/response.js'

export class InitializeController extends Controller{
    constructor(){
        super();
        (this.model = {Car}) , 
        (this.helper = {response , Pagination})
    }
}
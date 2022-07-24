import { Controller } from '../../../../controller.js'
import User from '../../../../../models/user-model.js'
import {hashPassword , validatePassword} from '../../../../../helpers/password.js'
import Pagination from '../../../../../helpers/pagination.js';
import {response} from '../../../../../helpers/response.js'

export class InitializeController extends Controller{
    constructor(){
        super();
        (this.model = {User}) , 
        (this.helper = {response , hashPassword , validatePassword , Pagination})
    }
}
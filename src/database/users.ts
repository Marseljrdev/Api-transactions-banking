import { User } from "../models/user";
import {transactions} from './transactionsBanking';

export const users = [
    new User('Marsel', '748.524.154-84', 'marsel@gmail.com', 4578, "as123", transactions),
    new User('Flavio', '526.841.325-95', 'flavio@gmail.com', 5742, "dasd123", transactions),
    new User('Abreu', '296.748.290-70', 'abreu@gmail.com', 2537, "try4343", transactions),
    new User('Brandao', '761.151.496-60', 'brandao@gmail.com', 9351, "po9897", transactions),
    new User('Junior', '601.859.417-75', 'junior@gmail.com', 8719, "iu789", transactions),
]
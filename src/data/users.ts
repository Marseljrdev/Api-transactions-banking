import { User } from "../app/models/user.model";
import {transactions} from './transactionsBanking';

export const users = [
    new User('Marsel', 74185269354, 'marsel@gmail.com', 4578, "as123", transactions),
    new User('Flavio', 74185269354, 'flavio@gmail.com', 5742, "dasd123", transactions),
    new User('Abreu', 74185269354, 'abreu@gmail.com', 2537, "try4343", transactions),
    new User('Brandao', 74185269354, 'brandao@gmail.com', 9351, "po9897", transactions),
    new User('Junior', 74185269354, 'junior@gmail.com', 8719, "iu789", transactions),
]
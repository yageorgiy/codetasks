import Category from "@/ts/class/Category";
import Parser from "@/ts/class/parser/Parser";
import UnitParser from "@/ts/class/parser/UnitParser";

export default class CategoryParser extends Parser<Category> {
    parse(data: any): Category {
        const category = new Category(data.name || "");

        for(let i in data.units)
            category.addUnit((new UnitParser()).parse(data.units[i]));

        return category;
    }
};
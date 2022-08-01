"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220730102659 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220730102659 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" rename column "name" to "title";');
    }
    async down() {
        this.addSql('alter table "post" rename column "title" to "name";');
    }
}
exports.Migration20220730102659 = Migration20220730102659;
//# sourceMappingURL=Migration20220730102659.js.map
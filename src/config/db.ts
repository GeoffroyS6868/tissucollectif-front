import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection, contracts?: mongoDB.Collection, bales?: mongoDB.Collection, suppliers?: mongoDB.Collection } = {};

function getDbUrl(): string {
    if (process.env.NODE_ENV == "production") {
        return process.env.URL_MONGO || "";
    }
    return process.env.URL_MONGO_TEST || "";
}

export async function connect() {

    if (collections.users !== undefined) {
        return;
    }

    dotenv.config();

    const url: string = getDbUrl();

    const client = new mongoDB.MongoClient(url);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME!);

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION!);
    collections.users = usersCollection;

    const contractsCollection: mongoDB.Collection = db.collection(process.env.CONTRACTS_COLLECTION!);
    collections.contracts = contractsCollection;

    const balesCollection: mongoDB.Collection = db.collection(process.env.BALES_COLLECTION!);
    collections.bales = balesCollection;

    const suppliersCollection: mongoDB.Collection = db.collection(process.env.SUPPLIERS_COLLECTION!);
    collections.suppliers = suppliersCollection;

}

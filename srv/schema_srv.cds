using test from '../db/schema';

service CatalogService {
    entity weight as projection on test.weight;
    entity userCredentials as projection on test.userCredentials;

    function getWeight() returns Integer;
    action sendEmail(itemList:String) returns Boolean;
    action sendWhatsApp(itemList:String) returns Boolean;
    action register(user:String, password: String, name: String) returns Boolean;
}
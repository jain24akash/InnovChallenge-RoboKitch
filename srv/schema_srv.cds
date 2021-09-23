using test from '../db/schema';

service CatalogService {
    entity weight as projection on test.weight;

    function getWeight() returns Integer;
    action sendEmail(itemList:String) returns Boolean;
    action sendWhatsApp(itemList:String) returns Boolean;
    action register(mobileNumber:String(10), password: String, name: String, emailID: String) returns Boolean;
    action login(mobileNumber:String(10),password:String) returns Boolean;
}
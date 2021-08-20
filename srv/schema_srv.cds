using test from '../db/schema';

service CatalogService {
    entity weight as projection on test.weight;

    function getWeight() returns Integer;
    action sendEmail(itemList:String) returns Boolean;
    action sendWhatsApp(itemList:String) returns Boolean;
}
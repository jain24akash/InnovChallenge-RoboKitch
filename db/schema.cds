namespace test;

using {managed} from '@sap/cds/common';

entity weight : managed {
    key ID     : UUID;
        weight : Integer;
}

entity userCredentials : managed {
    key mobileNumber : String(10);
        password     : String;
        name         : String;
        emailID      : String;
}

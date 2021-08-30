namespace test;

using {managed} from '@sap/cds/common';

entity weight : managed {
    key ID     : UUID;
        weight : Integer;
}

entity userCredentials : managed {
    key user     : String;
        password : String;
        name     : String;
}

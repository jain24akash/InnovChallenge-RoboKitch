namespace test;

using { managed } from '@sap/cds/common';

entity weight: managed {
    key ID: UUID;
    weight: Integer;
}
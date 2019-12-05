# Beacon

## Spécification

**id** : `string`,

**uuid** : `string`,

**name** : `string`,

**major** : `number`,

**minor** : `number`,

**id_client** : `string`,

**content** : `Content`

## Features

## Create

POST `api/beacons`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Body

| Champ      |     Type    |   Description |
| ------------- | ------------- | --------- |
| uuid      |        string        |      uuid of the beacon |
| name        |        string        |      name of the beacon |
| major      |        number        |      major of the beacon |
| minor      |        number        |      minir of the beacon |
| id_client      |        string        |      id of the client |
| content      |        Content        |      content that the beacon have to display |


### Success 200

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| beacon_id     |        string        |       id of the created beacon |

## List

GET `api/beacons`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Success 200

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| beacons     |        array        |      Array of beacons |


## Read

GET `api/beacon/:id`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Paramètre

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| id     |        string        |      Id of the beacon to read |

### Success 200

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| beacon     |        object        |      Beacon found |


## Delete

DELETE `api/beacon/:id`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Paramètre

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| id     |        string        |      Id of the beacon to delete |


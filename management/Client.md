# Client

## Spécification

**id** : `string`,

**name** : `string`,

## Features

## Create

POST `api/clients`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Body

| Champ      |     Type    |   Description |
| ------------- | ------------- | --------- |
| name        |        string        |      name of the client |


### Success 200

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| client_id     |        string        |       id of the client created |

## List

GET `api/clients`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Success 200

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| clients     |        array        |      Array of clients |


## Read

GET `api/client/:id`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        string        |      application/json |

### Paramètre

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| id     |        string        |      Id of the client to read |

### Success 200

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| client     |        object        |      client found |


## Delete

DELETE `api/client/:id`.

### Header

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| Content-type     |        client        |      application/json |

### Paramètre

| Champ     |     Type   |   Description |
| ------------- | ------------- | --------- |
| id     |        string        |      Id of the client to delete |


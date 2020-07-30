## Authorization

Access Levels (AL)
- 100 Admin
- 10 Volunteer
- 1 User

## Routes

### /api/account
- [ ] GET (AL 10 or account owner)
  - "/:id" (protected route) will only return the account with the specified id
		- returns an account object        
- [ ] POST
	- "/" adds a new account
		- requires a registration object
		- returns an account object
- [ ] PUT (AL 10 or account owner)
	- "/:id" (protected route) updates the account with the specified id
		- requires an account object
		- returns an account object
- [ ] DELETE (AL 100 or account owner)
  - "/:id" marks account as deleted (soft delete)

### /api/order
- [ ] GET (AL 10)
	- "/" returns all orders
		- returns an array of order objects
	- "/active" returns all active orders
	- "/complete/today" returns all completed orders from today
- [ ] POST (AL 1)
	- "/" adds a new order
      - requires an account object
      - returns an order object
- [ ] PUT (AL 10)
	- "/:id" updates the order with the specified id
      - requires an order object
      - returns an order object
- [ ] DELETE (AL 100)
	- "/:id" marks the order as deleted (soft delete)

### /api/location
- [ ] GET (AL 1)
	- "/" gets all locations
      - returns an array of location spots
- [ ] POST (AL 100)
	- "/" adds a new location
      - returns a location object
- [ ] PUT (AL 100)
	- "/:id" updates a location
      - returns a location object
- [ ] DELETE (AL 100)
	- "/:id" deletes a location

## Data Structures
### Account object
``` js
{
	id: <id number>,
	name: <user first name>,
	email: <email address>,
	access_level: <number>,
	profile: 
	{
		dietary_restrictions: <text>,
		last_pickup: <timestamp>,
		household_id: <varchar(12)>
	}
}
```

### Registration object
``` js
{
	email: <email address>,
	name: <user first name>,
	password: <text>,
	household_id: <varchar(12)>
}
```

### Order object
``` js
{
	id: <order id>,
	account_id: <order owner id>,
	location_id: <location id>,
	dietary_restrictions: <text>,
	walking_home: <bool>,
	pregnant: <bool>,
	child_birthday: <bool>
}
```

### Location Object
``` js
{
  id: <location id>,
  description: <varchar(100)>
}
```

## Sample Users

- Donald Duck
  - EFPDUCK04553
  - no food restrictions
- Daisy Duck 
  - EFPDUCK01371
  - no wheat 
- Betsy Duck 
  - EFPDUCK04646  
  - no milk, soy, or bananas 
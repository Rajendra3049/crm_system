base url=https://crm-system-acnp.onrender.com/

to check server working
/ping (GET-response="pong")

/employee/register (employee registration)
/employee/login (employee login)

/enquiry (GET-get all unclaimed enquire)
/enquiry/claimed (GET-get all claimed enquire by current logged-in employee)
/enquiry/create (POST-create enquire public api)
/enquiry/claim/:id (PATCH-claimed the enquiry by employee)

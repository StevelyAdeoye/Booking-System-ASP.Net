# Booking-System-ASP.Net
Membership Categories

There are three categories of Hall membership:

1.	Ordinary – users who register by purchasing tickets
2.	Friends – friends of the Oscher Hall who provide £1000 of financial support and pay £100 per annum membership fee. Friends are entitled to a 10% discount on ticket prices.
3.	Premier Membership – friends of the Oscher who provide £2000 financial support
4.	and pay £100 per annum membership fee. Premier members are entitled to a 15% discount on ticket prices.



 Functionality – Landing Page (index.html)

When the page loads (index.html) all of the required events (outlined below) will be attached to the appropriate objects. An AJAX request will be made to getseats.php and if successful a json object containing the seat numbers (if any) of all seats already previously selected will be returned and their images will be set to unavailable. You should implement a consistent error reporting and trapping scheme to notify the user in an appropriate way of any errors returned. 

 Authentication & Registration

Authentication (Login In)
You are required to implement authentication using sessionStorage to manage this at the client side. When the page loads for the first time the login form (logform) will be hidden. When the user clicks the Log In link the loginputs div will fade in with a suitable delay and will display on the page as shown below. 

If authentication is successful the following will be implemented, (i) the My tickets panel will be updated to display the users name (see below), (ii) the loginputs div will fade out with a suitable delay of 500ms, (iii) the anonymous links will fade out and the members links will fade in. 

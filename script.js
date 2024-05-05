  let currentUser = null;
        let users = [
            { username: "user1", password: "userpass", cityId: "New York", streetId: "Broadway", acceptCount: 0 },
            { username: "user2", password: "userpass", cityId: "Los Angeles", streetId: "Hollywood Blvd", acceptCount: 0 },
            // Add more users as needed
        ];

        window.onload = function () {
            const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
            if (storedUser) {
                currentUser = storedUser;
                showUserPanel();
            }
        };

        function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Check if the user is an admin
            if (username === "admin" && password === "adminpass") {
                showAdminPanel();
            } else {
                // Check if the user is a regular user
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    currentUser = user;
                    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
                    showUserPanel();
                } else {
                    alert("Invalid username or password");
                }
            }
        }

        function logout() {
            currentUser = null;
            sessionStorage.removeItem("currentUser");
            document.getElementById("userPanel").style.display = "none";
            document.getElementById("loginForm").style.display = "block";
        }

        function showAdminPanel() {
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("adminPanel").style.display = "block";
        }

        function showUserPanel() {
            document.getElementById("loggedInUser").textContent = currentUser.username;
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("userPanel").style.display = "block";

            displayFormList();
        }

        function displayFormList() {
            const formListElement = document.getElementById("formList");
            formListElement.innerHTML = "";

            // Simulated list of forms based on admin's city and street
            const forms = [
                { cityId: "New York", streetId: "Broadway", received: true },
                { cityId: "Los Angeles", streetId: "Hollywood Blvd", received: true },
                // Add more forms as needed
            ];

            forms.forEach(form => {
                if (form.cityId === currentUser.cityId && form.streetId === currentUser.streetId && form.received) {
                    const listItem = document.createElement("div");
                    listItem.textContent = `Form for ${currentUser.cityId}, ${currentUser.streetId}`;
                    const acceptButton = document.createElement("button");
                    acceptButton.textContent = "Accept";
                    acceptButton.classList.add("acceptButton");
                    acceptButton.addEventListener("click", () => {
                        currentUser.acceptCount++;
                        updateAcceptCount();
                        formListElement.removeChild(listItem);
                    });
                    listItem.appendChild(acceptButton);
                    formListElement.appendChild(listItem);
                }
            });
        }

        function updateAcceptCount() {
            document.getElementById("acceptCount").textContent = currentUser.acceptCount;
            sessionStorage.setItem(currentUser.username + "_acceptCount", currentUser.acceptCount);
        }

        function sendForm() {
            const cityName = document.getElementById("city").value;
            const streetName = document.getElementById("street").value;

            // Find users with the same city and street
            const recipients = users.filter(user => user.cityId === cityName && user.streetId === streetName);

            // Simulate sending the form to each recipient
            recipients.forEach(recipient => {
                // You can send the form to the recipient here
                console.log(`Form sent to ${recipient.username}`);
                // Update the recipient's acceptCount and save it to the session storage
                recipient.acceptCount++;
                sessionStorage.setItem(recipient.username + "_acceptCount", recipient.acceptCount);
            });

            // Clear the form fields
            document.getElementById("city").value = "";
            document.getElementById("street").value = "";

            alert("Form sent successfully!");
        }

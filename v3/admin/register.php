<div id="registerModal" class="modal">
    <div class="modal-content fade-section">
        <div class="modal-header">
            <h5>Register Admin</h5>
            <button class="modal-close" id="closeModalBtn">&times;</button>
        </div>

        <form id="register-form" class="form__group">
            <div class="form__field">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter Full Name" required />
            </div>

            <div class="form__field">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter Username" required />
            </div>

            <div class="form__field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter Email" required />
            </div>

            <div class="form__field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required />
            </div>

            <div class="form__field">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm_password" placeholder="Re-type Password" required />
            </div>

            <button class="btn btn-form" type="submit">Register</button>
            <div id="error-message" style="margin-top:10px; color:red;"></div>
        </form>
    </div>
</div>

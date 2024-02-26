document.getElementById("register-form").addEventListener("submit",async(e) => {
    e.preventDefault();
    console.log(e.target.children.user.value)
    const res = await fetch("http://localhost:80/api/register", {
        method:"POST",
        headers:{
            "content-Type" : "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.user.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value,
            select: e.target.children.select.value,
            numDoc: e.target.children.numDoc.value,
            lastname: e.target.children.lastname.value,
            confirmPassword: e.target.children.confirmPassword.value
        })
    });
})  
module.exports.signUpErrors = (err) => {
    let errors = { userName: '', email: '', password: '', dateOfBirth: '', avatar: '' , rgpd: ''};
    if (err.message.includes('userName'))
        errors.userName = "Pseudo incorrect ou déjà pris";
    if (err.message.includes('email'))
        errors.email = "Adresse e-mail incorrect";
    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 12 caractères minimun ";
    if (err.message.includes('dateOfBirth'))
        errors.dateOfBirth = "La date de naissance saisie n'est pas valide";
    if (err.message.includes('avatar'))
        errors.avatar = "Une erreur lors de chargement de l'avatar";
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = 'Ce pseudo est déja enregistrer'
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = 'Cet email est déjà enregistrer'

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };

    if (err.message.includes("email"))
        errors.email = "Email inconnu"
    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrect"

    return errors;
}

module.exports.createMovieErrors = (err) => {
    let errors = { name: '' };

    if (err.message.includes("name"))
        errors.name = "Le nom du film est déjà utilisé";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
        errors.name = "Le nom du film est déja enregistrer";
    // TODO Continuer les erreurs

    return errors;
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' };

    if (err.message.includes('invalid file'))
        errors.format = "Mauvais format d'image";

    if (err.message.includes('Max size'))
        errors.format = "Taille d'image trop volumineuse";


}
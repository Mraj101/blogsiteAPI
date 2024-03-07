function generateSecretString(length) {
    const characters = '-_@$#!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let secretString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        secretString += characters.charAt(randomIndex);
    }
    return secretString;
}

console.log(generateSecretString(128))
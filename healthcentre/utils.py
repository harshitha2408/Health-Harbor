import hashlib

def passwordHasher(userPassword):
    """Function to return the hash of the password using SHA-256. Input is the password of the user in string."""
    sha256 = hashlib.sha256()
    sha256.update(userPassword.encode())
    return sha256.hexdigest()

def emailHasher(userEmail):
    """Function to return the hash of the email using SHA-256. Input is the email of the user in string."""
    sha256 = hashlib.sha256()
    sha256.update(userEmail.encode())
    return sha256.hexdigest()

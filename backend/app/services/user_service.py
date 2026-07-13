from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password, verify_password

def get_profile(
    db: Session,
    user_id: int,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user

def update_profile(
    db: Session,
    user_id: int,
    username: str,
    email: str,
):

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user.username = username
    user.email = email

    db.commit()
    db.refresh(user)

    return user


def change_password(
    db: Session,
    user_id: int,
    current_password: str,
    new_password: str,
):

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(current_password, user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    user.password_hash = hash_password(new_password)

    db.commit()

    return {"message": "Password updated successfully"}
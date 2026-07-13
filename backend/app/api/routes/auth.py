from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hash_password
from app.schemas.user import UserLogin, Token
from app.core.security import verify_password
from app.core.jwt import create_access_token
from app.core.dependencies import get_current_user
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserUpdate, PasswordUpdate
from app.services.user_service import (
    get_profile,
    update_profile,
    change_password,
)
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    # Check if email already exists
    existing_email = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check if username already exists
    existing_username = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = (
    db.query(User)
    .filter(
        or_(
            User.email == form_data.username,
            User.username == form_data.username,
        )
    )
    .first()
)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        db_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {
            "sub": str(db_user.id)
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
    }

@router.get("/profile", response_model=UserResponse)
def profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_profile(
        db,
        current_user.id,
    )

@router.put(
    "/profile",
    response_model=UserResponse,
)
def update_my_profile(
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return update_profile(
        db=db,
        user_id=current_user.id,
        username=user.username,
        email=user.email,
    )

@router.put("/profile/password")
def update_my_password(
    passwords: PasswordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return change_password(
        db=db,
        user_id=current_user.id,
        current_password=passwords.current_password,
        new_password=passwords.new_password,
    )
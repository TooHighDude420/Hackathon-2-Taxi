from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group, User
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.response import Response
from base.serializers import *
from base.models import *

def get_active_account(request):
    role = request.session.get("role")
    if role not in ROLE_BY_NAME:
        return None
    return Account.objects.filter(user_id=request.user, role_type_id=ROLE_BY_NAME[role]).first()

def user_payload(request):
    return {"username": request.user.username, "role": request.session.get("role")}

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    login(request, user)
    request.session["role"] = serializer.validated_data["role"]
    return Response({"user": user_payload(request)}, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    user = authenticate(request, username=data["username"], password=data["password"])
    if user is None:
        raise ValidationError({"detail": "Onjuiste gebruikersnaam of wachtwoord."})

    account = Account.objects.filter(user_id=user).first()
    if account is None:
        raise ValidationError({"detail": "Dit account hoort niet bij de app."})

    # De rol kies je bij het registreren, niet bij het inloggen: die staat al op het account.
    login(request, user)
    request.session["role"] = ROLE_NAME_BY_VALUE[account.role_type_id]
    return Response({"user": user_payload(request)})

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)

@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def me(request):
    if not request.user.is_authenticated:
        return Response({"user": None})
    return Response({"user": user_payload(request)})

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class PersonalInfoViewSet(viewsets.ModelViewSet):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer
    permission_classes = [permissions.IsAuthenticated]

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

class TaxiViewSet(viewsets.ModelViewSet):
    queryset = Taxi.objects.select_related("account_id__user_id").order_by("name")
    serializer_class = TaxiSeriallizer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action in ("update", "partial_update", "destroy"):
            return queryset.filter(account_id=get_active_account(self.request))
        return queryset

    def perform_create(self, serializer):
        account = get_active_account(self.request)
        if account is None or account.role_type_id != Account.RoleChoices.DRIVER:
            raise PermissionDenied("Alleen chauffeurs kunnen een taxi registreren.")
        if Taxi.objects.filter(account_id=account).exists():
            raise ValidationError({"detail": "Je hebt al een taxi geregistreerd."})
        serializer.save(account_id=account)

    @action(detail=False)
    def mine(self, request):
        taxi = self.get_queryset().filter(account_id=get_active_account(request)).first()
        return Response(self.get_serializer(taxi).data if taxi else None)

class RideViewSet(viewsets.ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]

class RideDataViewSet(viewsets.ModelViewSet):
    queryset = RideData.objects.all()
    serializer_class = RideDataSerializer
    permission_classes = [permissions.IsAuthenticated]
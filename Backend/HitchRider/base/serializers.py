from decimal import Decimal

from django.contrib.auth.models import Group, User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
import base.models as md
from rest_framework import serializers

ROLE_BY_NAME = {
    "passenger": md.Account.RoleChoices.PASSENGER,
    "driver": md.Account.RoleChoices.DRIVER,
}
ROLE_NAME_BY_VALUE = {value: name for name, value in ROLE_BY_NAME.items()}


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]

class PersonalInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.PersonalInfo
        fields = ["country", "city"]

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.Account
        fields = ["user_id", "role_type_id", "personal_info_id"]

class TaxiSeriallizer(serializers.ModelSerializer):
    driver = serializers.CharField(source="account_id.user_id.username", read_only=True)

    class Meta:
        model = md.Taxi
        fields = ["id", "name", "charge_type", "rate", "driver"]
        extra_kwargs = {"rate": {"min_value": Decimal("0.01")}}

class RideSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.Ride
        fields = ["passenger_id", "driver_id", "status", "start_point", "end_point"]

class RideDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.RideData
        fields = ["ride_id", "expected_distance_in_kilometers", "actual_distance_in_kilometers", "expected_time_in_minutes", "actual_time_in_minutes", "expected_cost", "actual_cost"]

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class RegisterSerializer(LoginSerializer):
    username = serializers.CharField(max_length=150, validators=[UnicodeUsernameValidator()])
    role = serializers.ChoiceField(choices=list(ROLE_BY_NAME))
    country = serializers.CharField(max_length=30)
    city = serializers.CharField(max_length=30)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Deze gebruikersnaam is al in gebruik.")
        return value

    def validate(self, attrs):
        try:
            validate_password(attrs["password"], user=User(username=attrs["username"]))
        except DjangoValidationError as error:
            raise serializers.ValidationError({"password": list(error.messages)})
        return attrs

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(validated_data["username"], password=validated_data["password"])
            personal_info = md.PersonalInfo.objects.create(
                country=validated_data["country"],
                city=validated_data["city"],
            )
            md.Account.objects.create(
                user_id=user,
                role_type_id=ROLE_BY_NAME[validated_data["role"]],
                personal_info_id=personal_info,
            )
        return user

from django.contrib.auth.models import Group, User
import HitchRider.base.models as md
from rest_framework import serializers


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

class TaxiSeriallizer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.Taxi
        fields = ["charge_type", "name", "rate", "account_id"]

class RideSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.Ride
        fields = ["passenger_id", "driver_id", "status", "start_point", "end_point"]

class RideDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = md.RideData
        fields = ["ride_id", "expected_distance_in_kilometers", "actual_distance_in_kilometers", "expected_time_in_minutes", "actual_time_in_minutes", "expected_cost", "actual_cost"]
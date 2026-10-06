from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class PersonalInfo(models.Model):
    country = models.CharField(max_length=30)
    city = models.CharField(max_length=30)

class Account(models.Model):
    class RoleChoices(models.IntegerChoices):
        PASSENGER = 0, "passenger"
        DRIVER = 1, "driver"

    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    role_type_id = models.IntegerField(choices=RoleChoices.choices)
    personal_info_id = models.ForeignKey(PersonalInfo, on_delete=models.CASCADE)

class Taxi(models.Model):
    class ChargeTypes(models.IntegerChoices):
        DISTANCE = 0, "distance"
        TIME = 1, "time"
    charge_type = models.IntegerField(choices=ChargeTypes.choices)
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    rate = models.DecimalField(max_digits=10, decimal_places=2)

class Ride(models.Model):
    class Status(models.IntegerChoices):
        PENDING = 0, "pending"
        SUCCESS = 1, "success"

    passenger_id = models.ForeignKey(
        Account, on_delete=models.DO_NOTHING, related_name="passenger_rides"
    )
    driver_id = models.ForeignKey(
        Account, on_delete=models.DO_NOTHING, related_name="driver_rides"
    )
    status = models.IntegerField(choices=Status.choices)

    start_point = models.JSONField()
    end_point = models.JSONField()

class RideData(models.Model):
    ride_id = models.ForeignKey(Ride, on_delete=models.CASCADE)
    expected_distance_in_kilometers = models.DecimalField(max_digits=10, decimal_places=2)
    actual_distance_in_kilometers = models.DecimalField(max_digits=10, decimal_places=2)
    expected_time_in_minutes = models.IntegerField()
    actual_time_in_minutes = models.IntegerField()
    expected_cost = models.DecimalField(max_digits=10, decimal_places=2)
    actual_cost = models.DecimalField(max_digits=10, decimal_places=2)
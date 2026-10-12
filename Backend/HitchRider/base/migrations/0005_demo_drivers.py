from django.contrib.auth.hashers import make_password
from django.db import migrations

DRIVER_ROLE = 1
DISTANCE = 0
TIME = 1

DEMO_DRIVERS = [
    {"username": "jan.meeuwissen", "taxi": "Taxi Meeuwissen", "charge_type": DISTANCE, "rate": "2.50"},
    {"username": "j.devries", "taxi": "Nijmegen Centrum Taxi", "charge_type": TIME, "rate": "0.45"},
    {"username": "s.bakker", "taxi": "Waal Taxi", "charge_type": DISTANCE, "rate": "2.20"},
]


def add_demo_drivers(apps, schema_editor):
    User = apps.get_model("auth", "User")
    PersonalInfo = apps.get_model("base", "PersonalInfo")
    Account = apps.get_model("base", "Account")
    Taxi = apps.get_model("base", "Taxi")

    for driver in DEMO_DRIVERS:
        # Demo-chauffeurs kunnen niet inloggen: ze bestaan alleen om in het overzicht te verschijnen.
        user = User.objects.create(username=driver["username"], password=make_password(None))
        personal_info = PersonalInfo.objects.create(country="Nederland", city="Nijmegen")
        account = Account.objects.create(user_id=user, role_type_id=DRIVER_ROLE, personal_info_id=personal_info)
        Taxi.objects.create(
            account_id=account,
            name=driver["taxi"],
            charge_type=driver["charge_type"],
            rate=driver["rate"],
        )


def remove_demo_drivers(apps, schema_editor):
    User = apps.get_model("auth", "User")
    PersonalInfo = apps.get_model("base", "PersonalInfo")
    usernames = [driver["username"] for driver in DEMO_DRIVERS]

    PersonalInfo.objects.filter(account__user_id__username__in=usernames).delete()
    User.objects.filter(username__in=usernames).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('base', '0004_rename_final_cost_ridedata_actual_cost'),
    ]

    operations = [
        migrations.RunPython(add_demo_drivers, remove_demo_drivers),
    ]

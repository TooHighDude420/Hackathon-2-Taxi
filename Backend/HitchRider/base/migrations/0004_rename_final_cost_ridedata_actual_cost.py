from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_taxi_charge_type_alter_taxi_rate_ride_ridedata'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ridedata',
            old_name='final_cost',
            new_name='actual_cost',
        ),
    ]

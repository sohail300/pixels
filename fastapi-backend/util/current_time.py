from datetime import datetime, time

def get_time_hh_mm_ss() -> time:
    now = datetime.now().time()  # Get current time
    formatted_time = time(now.hour, now.minute, now.second)  # Keep as datetime.time
    return formatted_time

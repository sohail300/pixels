from datetime import datetime

def get_time_hh_mm_ss() -> str:
    now = datetime.now().time()  # Get current time
    # Format as HH_MM_SS with underscores instead of colons
    formatted_time = f"{now.hour:02d}_{now.minute:02d}_{now.second:02d}"
    return formatted_time

"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/dev/howto/deployment/asgi/

"""

import os
import sys
from pathlib import Path

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter

# This allows easy placement of apps within the interior
# backend directory.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(BASE_DIR / "backend"))

# If DJANGO_SETTINGS_MODULE is unset, default to the local settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")

# This application object is used by any ASGI server configured to use this file.
django_application = get_asgi_application()

# Import websocket application here, so apps from django_application are loaded first
from config.websocket import websocket_application  # noqa: E402


app = ProtocolTypeRouter(
    {
        "http": django_application,
        "websocket": websocket_application,
    }
)

async def application(scope, receive, send):
    """
    The ASGI application function.

    This function is the entry point for the ASGI server and is responsible
    for routing incoming requests to either the Django application or the
    websocket application.

    Parameters
    ----------
    scope : dict
        The scope of the incoming request.
    receive : callable
        A callable that receives incoming event messages.
    send : callable
        A callable that sends outgoing event messages.

    Returns
    -------
    None
    """
    if scope["type"] == "http":
        await django_application(scope, receive, send)
    elif scope["type"] == "websocket":
        await websocket_application(scope, receive, send)
    else:
        msg = f"Unknown scope type {scope['type']}"
        raise NotImplementedError(msg)

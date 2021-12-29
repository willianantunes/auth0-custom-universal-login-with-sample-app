from django.urls import path

from sample_application_regular_webapp import settings
from sample_application_regular_webapp.apps.core import views
from sample_application_regular_webapp.apps.core.api import api_views
from sample_application_regular_webapp.apps.core.api.v1 import api_views as api_views_v1
from sample_application_regular_webapp.apps.core.services.oidc_provider import OIDCProvider

OIDCProvider.configure_class_properties(
    settings.SOCIAL_AUTH_AUTH0_DOMAIN,
    settings.SOCIAL_AUTH_AUTH0_KEY,
    settings.SOCIAL_AUTH_AUTH0_SECRET,
    settings.SOCIAL_AUTH_AUTH0_SCOPE,
)
OIDCProvider.configure_oidc_configuration_document()

urlpatterns = [
    # Pages
    path("", views.index, name="index"),
    path("login-auth-code", views.initiate_login_flow, name="login-auth-code-flow"),
    # http://localhost:8000/logout
    path("logout", views.logout, name="logout"),
    # APIs
    path("health-check", api_views.health_check, name="health-check"),
    # http://localhost:8000/api/v1/response-oidc
    path("api/v1/response-oidc", api_views_v1.handle_response_oidc, name="v1/response-oidc"),
    path("api/v1/user-info", api_views_v1.retrieve_user_info, name="v1/user-info"),
]

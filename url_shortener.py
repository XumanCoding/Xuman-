import pyshorteners

class h:
    """
    A class for shortening and expanding URLs using different services.

    Attributes:
    service (str): The URL shortening service to use (default is 'tinyurl').
    """

    def __init__(self, service='tinyurl'):
        """
        Initialize the URLShortener with the specified service.

        Args:
        service (str, optional): The URL shortening service to use. Defaults to 'tinyurl'.
        """
        self.shortener = pyshorteners.Shortener(service)

    def shorten_url(self, url, custom_alias=None):
        """
        Shorten the given URL.

        Args:
        url (str): The URL to be shortened.
        custom_alias (str, optional): Custom alias for the shortened URL.

        Returns:
        str: The shortened URL.
        """
        try:
            if custom_alias:
                # Validate custom alias if provided
                if not self.is_valid_alias(custom_alias):
                    raise ValueError("Invalid custom alias. It should contain only letters, numbers, and underscores.")
                return self.shortener.short(url, custom_alias=custom_alias)
            else:
                return self.shortener.short(url)
        except pyshorteners.exceptions.ShorteningErrorException as e:
            print(f"Error occurred while shortening URL: {e}")
            return None
        except ValueError as e:
            print(f"Error: {e}")
            return None

    def expand_url(self, short_url):
        """
        Expand the given shortened URL.

        Args:
        short_url (str): The shortened URL to be expanded.

        Returns:
        str: The expanded URL.
        """
        try:
            return self.shortener.expand(short_url)
        except pyshorteners.exceptions.ExpandingErrorException as e:
            print(f"Error occurred while expanding URL: {e}")
            return None

    def is_valid_alias(self, alias):
        """
        Validate a custom alias for the shortened URL.

        Args:
        alias (str): The custom alias to be validated.

        Returns:
        bool: True if the alias is valid, False otherwise.
        """
        # Check if the alias contains only letters, numbers, and underscores
        return alias.isalnum() or '_' in alias

# Example usage:
if __name__ == "__main__":
    url_shortener = URLShortener()

    # Shorten a URL with custom alias
    original_url = "https://www.example.com/very/long/url"
    custom_alias = "your_name"  # Change this to your desired custom alias
    short_url = url_shortener.shorten_url(original_url, custom_alias=custom_alias)
    if short_url:
        print("Shortened URL with custom alias:", short_url)

        # Expand a shortened URL
        expanded_url = url_shortener.expand_url(short_url)
        if expanded_url:
            print("Expanded URL:", expanded_url)
            
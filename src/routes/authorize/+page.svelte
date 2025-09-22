<script>
    let { data } = $props();

    let message = $state("");

    const urlParams = new URLSearchParams(window.location.search);

    let code = urlParams.get('code');
    let auth_state = urlParams.get('state'); 

    message = "Will send token request to " + data.config.token_url + " with code: " + code + " and state: " + auth_state;
</script>

<h1>{message}</h1>
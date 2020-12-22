export default function useLogout() {
  const handleLogout = async (e, router) => {
    e.preventDefault();

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return router.push("/logout");
    }
  };

  return { handleLogout };
}

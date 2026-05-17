'use client'

export default function Contact() {
  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <a href="/" style={{position: "absolute", left: "50%", top: "10px", transform: "translateX(-50%)", display: "flex", alignItems: "center"}}>
          <img
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            style={{height: "60px", width: "auto"}}
          />
        </a>
      </main>
      <div>
        <h1 className="grid justify-center">Oh, you wanna reach out direct?</h1>
        <br></br>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4"
          href="https://discord.com/users/1161442807005859880"
          >[peaches - Discord]</a>
        </h2>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4"
          href="https://discord.com/users/149282781640392706"
          >[vhulf - Discord]</a>
        </h2>
        <br></br><br></br>
        <h1 className="grid justify-center">Or is your question more general?</h1>
        <br></br>
        <a
          className="font-bold hover:underline hover:underline-offset-4 grid justify-center"
          href="https://discord.com/invite/J8rfn9e"
          >[DKR Runners - Discord Invite]</a>
      </div>
    </div>
  );
}

'use client'

export default function Links() {
  return (
    <div className="grid min-h-screen">
      <main className="grid grid-rows-[20px_1fr_20px] justify-center pt-5">
      <a href="/" style={{"zIndex":"99999"}}>
          <img
            className=""
            src="/tt-draft-logo.png"
            alt="Main Site Logo"
            width={850}
            height={100}
          />
        </a>
      </main>
      <div>
        <h1 className="grid justify-center">Some stuff we think is important...</h1>
        <br></br>
        <br></br>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4"
          href="https://dkr64.com/"
          >[DKR64.com]</a>
        </h2>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4"
          href="https://dkr64.com/"
          >[DKR64.com]</a>
        </h2>
        <h2 className="grid justify-center">
          <a
          className="font-bold hover:underline hover:underline-offset-4 grid justify-center"
          href="https://discord.com/invite/J8rfn9e"
          >[DKR Runners - Discord Invite]</a>
        </h2>
      </div>
    </div>
  );
}

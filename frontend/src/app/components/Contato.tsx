"use client"

import styles from "./contato.module.css"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { FaInstagram } from "react-icons/fa6";
import { action } from "./action"
import { useState } from "react"

export default function Contato() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  async function enviarContato() {
    if (loading) return

    if (!nome.trim() || !email.trim() || !msg.trim()) {
      alert("Preencha todos os campos antes de enviar.")
      return
    }

    try {
      setLoading(true)

      const response = await action({
        nome,
        email,
        mensagem: msg
      })

      if (response?.error) {
        alert(response.error)
        return
      }

      alert("Mensagem enviada com sucesso!")
      setNome("")
      setEmail("")
      setMsg("")
    }
    catch (e) {
      console.error(e)
      alert("Ocorreu um erro ao enviar sua mensagem.")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.contato} id="contato">
      <div className={styles.bgWrapper}>
        <div className={`${styles.block} ${styles.block1}`}></div>
        <div className={`${styles.block} ${styles.block2}`}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.form}>
          <h2>Contato:</h2>

          <label htmlFor="nome">Nome:</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            type="text"
            id="nome"
          />

          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
          />

          <label htmlFor="msg">Mensagem:</label>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            id="msg"
            className={styles.msg}
          ></textarea>

          <button onClick={enviarContato} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>

        <div className={styles.redes}>
          <h2>Ou acesse:</h2>
          <div className={styles.redesLista}>

            <a href="https://github.com/Arielsnts" target="_blank" className={styles.redeItem}>
              <div className={styles.fundoRede}>
                <SiGithub size={40} />
              </div>
              <p>GitHub</p>
            </a>

            <a href="https://www.linkedin.com/in/ariel-santos-souza-998b8b31a" target="_blank" className={styles.redeItem}>
              <div className={styles.fundoRede}>
                <SiLinkedin size={40} />
              </div>
              <p>LinkedIn</p>
            </a>

            <a href="https://www.instagram.com/arielsnts__/" 
            className={styles.redeItem}>
              <div className={styles.fundoRede}>
                <FaInstagram size={40} />
              </div>
              <p>Instagram</p>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
